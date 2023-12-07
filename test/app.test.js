const request = require('supertest');
const app = require('../app');
const Museum = require('../models/museum');

jest.mock('../models/museum', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
}));

describe('GET /museums', () => {
  it('should respond with a list of museums', async () => {
    const mockMuseums = [
      { id: 1, latitude: 50.4501, longitude: 30.5234, name: 'Museum 1' },
      { id: 2, latitude: 49.8397, longitude: 24.0297, name: 'Museum 2' }
    ];

    Museum.findAll.mockResolvedValue(mockMuseums);

    const res = await request(app).get('/museums');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockMuseums);
    expect(Museum.findAll).toHaveBeenCalledWith({
      attributes: ['id', 'latitude', 'longitude', 'name']
    });
  });

  it('should handle errors', async () => {
    const errorMessage = 'Error fetching museums';
    Museum.findAll.mockRejectedValue(new Error(errorMessage));

    const res = await request(app).get('/museums');

    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual(errorMessage);
  });
});
