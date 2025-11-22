// src/services/hackathonService.js
// Временный сервис без API вызовов
export const hackathonService = {
  async getAll() {
    // Возвращаем mock данные вместо API вызова
    return [
      {
        id: '1',
        name: 'AI Challenge 2024',
        description: 'Соревнование по созданию AI-решений для бизнеса',
        status: 'active',
        startDate: '2024-01-15',
        endDate: '2024-01-17',
        participants: 45,
        format: 'online'
      },
      {
        id: '2', 
        name: 'Blockchain Hackathon',
        description: 'Разработка децентрализованных приложений',
        status: 'upcoming',
        startDate: '2024-02-01',
        endDate: '2024-02-03',
        participants: 0,
        format: 'offline'
      }
    ];
  },

  async getById(id) {
    const hackathons = await this.getAll();
    return hackathons.find(h => h.id === id) || null;
  }
};
