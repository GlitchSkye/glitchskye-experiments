import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnDestroy {
  bars = Array.from({ length: 40 }, (_, i) => i);

  isStarted = false;
  typedText = '';
  wordCount = 0;
  wordsPerMinute = 0;
  elapsedSeconds = 0;
  volume = 0;

  private startTime = 0;
  private timer: ReturnType<typeof setInterval> | null = null;

  beginTyping(): void {
    this.resetTest();
    this.isStarted = true;
    this.startTime = Date.now();
    this.timer = setInterval(() => this.updateStats(), 250);
  }

  onTyping(event: Event): void {
    this.typedText = (event.target as HTMLTextAreaElement).value;
    const text = this.typedText.trim();
    this.wordCount = text ? text.split(/\s+/).length : 0;
    this.updateStats();
  }

  private updateStats(): void {
    if (!this.isStarted) return;

    const elapsed = Date.now() - this.startTime;
    this.elapsedSeconds = Math.floor(elapsed / 1000);

    const minutes = elapsed / 60000;
    this.wordsPerMinute =
      minutes > 0 ? Math.round(this.wordCount / minutes) : 0;

    this.volume = Math.min(100, this.wordsPerMinute);
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.elapsedSeconds / 60);
    const seconds = this.elapsedSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  stopTyping(): void {
    this.updateStats();
    this.isStarted = false;
    this.clearTimer();
  }

  resetTest(): void {
    this.clearTimer();
    this.isStarted = false;
    this.typedText = '';
    this.wordCount = 0;
    this.wordsPerMinute = 0;
    this.elapsedSeconds = 0;
    this.volume = 0;
  }

  private clearTimer(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }
}