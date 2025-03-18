class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  word: string;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.word = '';
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let current = this.root;
    const lowerWord = word.toLowerCase();

    for (const char of lowerWord) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }
    current.isEndOfWord = true;
    current.word = word;
  }

  search(prefix: string): string[] {
    const result: string[] = [];
    let current = this.root;
    const lowerPrefix = prefix.toLowerCase();

    // Navigate to the last node of the prefix
    for (const char of lowerPrefix) {
      if (!current.children.has(char)) {
        return result;
      }
      current = current.children.get(char)!;
    }

    // Collect all words with the given prefix
    this.collectWords(current, result);
    return result;
  }

  private collectWords(node: TrieNode, result: string[]): void {
    if (node.isEndOfWord) {
      result.push(node.word);
    }

    for (const child of node.children.values()) {
      this.collectWords(child, result);
    }
  }
}