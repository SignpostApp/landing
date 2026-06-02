import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "../posts";

/**
 * Renders a single block of inline text, supporting:
 *   **bold**            -> <strong>
 *   [label](/internal)  -> next/link
 *   [label](https://…)  -> external <a target="_blank">
 */
function renderInline(text: string): ReactNode {
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      nodes.push(<strong key={key++}>{match[1]}</strong>);
    } else {
      const label = match[2];
      const href = match[3];
      if (href.startsWith("/")) {
        nodes.push(
          <Link key={key++} href={href}>
            {label}
          </Link>,
        );
      } else {
        nodes.push(
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>,
        );
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export default function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="blog-prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i}>{renderInline(block.text)}</h2>;
          case "h3":
            return <h3 key={i}>{renderInline(block.text)}</h3>;
          case "p":
            return <p key={i}>{renderInline(block.text)}</p>;
          case "quote":
            return (
              <blockquote key={i}>
                <p>{renderInline(block.text)}</p>
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
