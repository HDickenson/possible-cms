// Shared SDK types. Implementation: Epic 8.

export interface Block {
  type: string;
  props: Record<string, unknown>;
}

export interface PuckData {
  root: { props: Record<string, unknown> };
  content: Block[];
}

export interface PageMeta {
  id: string;
  slug: string;
  locale: string;
  status: "draft" | "scheduled" | "live" | "archived";
  publishedAt?: string;
}
