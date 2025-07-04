import React, { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const assistantStreamRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);

  const handleSend = async () => {
    const userText = input.trim();
    if (!userText) return;

    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInput('');

    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
    const assistantIndex = messages.length + 1;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        stream: true,
        messages: [
          { role: 'user', content: userText },
        ],
      }),
    });

    if (!res.body) {
      console.error('No response body');
      return;
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const {value,done} = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
    if(line === 'data:[DONE]'){
      reader.releaseLock();
      break;
    }
    if (!line.startsWith('data:')) continue;

      try {
        const json = JSON.parse(line.replace(/^data: /, ''));
        const delta = json.choices?.[0]?.delta?.content;
        if (delta) {
          setMessages(prev => {
            const copy = [...prev];
            copy[assistantIndex] = {
              role: 'assistant',
              content: copy[assistantIndex].content + delta
            };
            return copy;
          });
        }
      } catch (err) {
        console.error('SSE parse error', err);
      }
    }
  }

    reader.releaseLock();
  };

  useEffect(() => {
    return () => {
      assistantStreamRef.current?.cancel();
    };
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h2>Chat Assistant</h2>

      <div
        style={{
          border: '1px solid #ccc',
          height: 300,
          overflowY: 'auto',
          padding: 10,
          marginBottom: 10,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === 'user' ? 'right' : 'left',
              margin: '6px 0',
            }}
          >
            <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong>{' '}
            {msg.content}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex' }}>
        <input
          style={{ flex: 1, padding: 8 }}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message…"
        />
        <button onClick={handleSend} style={{ padding: '8px 16px', marginLeft: 8 }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
