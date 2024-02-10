import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiChatService } from '../shared/services/ai-chat/ai-chat.service';

@Component({
  selector: 'app-ai-chat',
  standalone: false ,
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.css'
})
export class AiChatComponent implements OnInit {
  userInput: string = '';
  chatHistory: string[] = [];

  constructor(private aiService: AiChatService) { }

  ngOnInit() {
    // Initialize chat history if needed
  }

  async onSendMessage() {
    if (!this.userInput) {
      return; // Handle empty input gracefully
    }

    try {
      const response = await this.aiService.sendMessage(this.userInput);
      this.chatHistory.push(`You: ${this.userInput}`);
      this.chatHistory.push(`Gemini: ${response}`);
      this.userInput = ''; // Clear input after sending
      console.log(JSON.stringify(response))
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      // Handle API errors gracefully, e.g., display error message to user
    }
  }
}
