export interface Fornitore {
  id: string;
  ragione_sociale: string;
  piva: string;
  telefono?: string;
  email?: string;
  tipologia_id?: string;
}