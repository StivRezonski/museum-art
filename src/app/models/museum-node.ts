export interface MuseumNode {
  id: string;
  name: string;
  type?: string;
  collection?: MuseumNode[];
}
