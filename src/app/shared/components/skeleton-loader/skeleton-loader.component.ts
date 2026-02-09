import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonShape = 'rectangle' | 'circle' | 'text';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getSkeletonClasses()" [style.width.px]="width" [style.height.px]="height"></div>
  `,
  styles: [
    `
      .skeleton {
        background: linear-gradient(90deg, #1e293b 0%, #334155 50%, #1e293b 100%);
        background-size: 200% 100%;
        animation: loading 1.5s ease-in-out infinite;
      }

      @keyframes loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }

      .skeleton-rectangle {
        border-radius: 0.5rem;
      }

      .skeleton-circle {
        border-radius: 50%;
      }

      .skeleton-text {
        border-radius: 0.25rem;
        height: 1rem;
      }
    `,
  ],
})
export class SkeletonLoaderComponent {
  @Input() shape: SkeletonShape = 'rectangle';
  @Input() width?: number;
  @Input() height?: number;
  @Input() count = 1;

  getSkeletonClasses(): string {
    const baseClass = 'skeleton';
    const shapeClass = `skeleton-${this.shape}`;
    return `${baseClass} ${shapeClass}`;
  }
}
