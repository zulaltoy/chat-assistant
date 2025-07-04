  React Chat App (OpenAI GPT-4)

This is a simple React-based chat application that connects to the OpenAI API (GPT-4) to provide real-time conversation responses using the streaming endpoint.

---

 How to Run the App

1. **Clone the repository** :
   
   git clone https://github.com/zulaltoy/chat-assistant
   cd chat-assistant

2-Install dependencies:

yarn

3-Add your OpenAI API key:

Create a .env file in the root directory (same level as package.json).

Add the following line:


VITE_OPENAI_API_KEY=your_openai_api_key_here


4-Start the development server:


yarn start



Open the app in your browser:

http://localhost:3000

5- How to Add Your API Key
This project uses OpenAI GPT-4 via the chat/completions endpoint.

Get your API key from https://platform.openai.com/account/api-keys

Add it to the .env file like this:

VITE_OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


