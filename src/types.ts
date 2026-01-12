export interface Scenario {
  id: number;
  scenario: string;
  correctAnswer: 'Deterministic' | 'Non-Deterministic';
  explanation: string;
}

export interface GameData {
  title: string;
  scenarios: Scenario[];
}
