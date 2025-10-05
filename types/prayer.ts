export interface Prayer {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  expiresAt: Date;
  isAnswered: boolean;
  category?: string;
  tags?: string[];
}

export interface CreatePrayerData {
  title: string;
  content: string;
  category?: string;
  tags?: string[];
}

export interface PrayerFilters {
  category?: string;
  isAnswered?: boolean;
  limit?: number;
}
