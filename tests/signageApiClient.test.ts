import axios from 'axios';
import { signageApiClient } from '../src';
import type {
  AllCardSignageLinks,
  AllCardSignageLinksApiResponse,
  CardSignageLink,
} from '../src/types';

jest.mock('axios', () => ({
  get: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
}));

const mockCardSignageLink: CardSignageLink = {
  status: 'success',
  description: 'Succeeded getting content by cardIDm',
  cardIDm: '1234567890123456',
  url: 'https://example.com',
  displaySeconds: 10,
};

describe('signageApiClient', () => {
  describe('getContentByCardIDm', () => {
    it('カードIDmに紐づくサイネージで表示するコンテンツを返すべきです', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: mockCardSignageLink });
      const client = new signageApiClient('http://localhost', 'user', 'password');
      const result = await client.getContentByCardIDm('1234567890123456');

      const expectedCardSignageLink: CardSignageLink = {
        status: 'success',
        description: 'Succeeded getting content by cardIDm',
        cardIDm: '1234567890123456',
        url: 'https://example.com',
        displaySeconds: 10,
      };

      expect(result).toEqual(expectedCardSignageLink);
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost/api/v1/signage/cards/1234567890123456',
        {
          headers: { Authorization: expect.any(String) },
        },
      );
    });

    it('取得に失敗した場合はエラーをスローするべきです', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to get content by cardIDm'));
      const client = new signageApiClient('http://localhost', 'user', 'password');
      const result = client.getContentByCardIDm('1234567890123456');

      await expect(result).rejects.toThrow('Failed to get content by cardIDm');
    });
  });

  describe('getAllCardIDmAndContentList', () => {
    it('ログインユーザのカードIDmとサイネージで表示するコンテンツの紐づけの一覧を返すべきです', async () => {
      const mockResponse: AllCardSignageLinksApiResponse = {
        status: 'success',
        description: 'Succeeded getting all cardIDm and content list',
        links: [
          {
            cardIDm: '1234567890123456',
            url: 'https://example.com',
            displaySeconds: 10,
          },
        ],
      };
      (axios.get as jest.Mock).mockResolvedValue({ data: mockResponse });
      const client = new signageApiClient('http://localhost', 'user', 'password');
      const result = await client.getAllCardIDmAndContentList();

      const expectedResponse: AllCardSignageLinks = {
        status: 'success',
        description: 'Succeeded getting all cardIDm and content list',
        links: [
          {
            cardIDm: '1234567890123456',
            url: 'https://example.com',
            displaySeconds: 10,
          },
        ],
      };

      expect(result).toEqual(expectedResponse);
      expect(axios.get).toHaveBeenCalledWith('http://localhost/api/v1/signage/cards', {
        headers: { Authorization: expect.any(String) },
      });
    });

    it('取得に失敗した場合はエラーをスローするべきです', async () => {
      (axios.get as jest.Mock).mockRejectedValue(
        new Error('Failed to get all cardIDm and content list'),
      );
      const client = new signageApiClient('http://localhost', 'user', 'password');
      const result = client.getAllCardIDmAndContentList();

      await expect(result).rejects.toThrow('Failed to get all cardIDm and content list');
    });
  });

  describe('registerContentByCardIDm', () => {
    it('カードIDmにコンテンツを登録することに成功した場合はCardSignageLinkを返すべきです', async () => {
      (axios.put as jest.Mock).mockResolvedValue({ data: mockCardSignageLink });
      const client = new signageApiClient('http://localhost', 'user', 'password');
      const result = await client.registerContentByCardIDm(
        '1234567890123456',
        'https://example.com',
        10,
      );

      const expectedCardSignageLink: CardSignageLink = {
        status: 'success',
        description: 'Succeeded registering content by cardIDm',
        cardIDm: '1234567890123456',
        url: 'https://example.com',
        displaySeconds: 10,
      };

      expect(result).toEqual(expectedCardSignageLink);
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost/api/v1/signage/cards/1234567890123456',
        { url: 'https://example.com', display_seconds: 10 },
        { headers: { Authorization: expect.any(String), 'Content-Type': 'application/json' } },
      );
    });

    it('登録に失敗した場合はエラーをスローするべきです', async () => {
      (axios.put as jest.Mock).mockRejectedValue(
        new Error('Failed to register content by cardIDm'),
      );
      const client = new signageApiClient('http://localhost', 'user', 'password');
      const result = client.registerContentByCardIDm('1234567890123456', 'https://example.com', 10);

      await expect(result).rejects.toThrow('Failed to register content by cardIDm');
    });
  });

  describe('updateContentByCardIDm', () => {
    it('カードIDmに紐づくコンテンツを更新することに成功した場合はCardSignageLinkを返すべきです', async () => {
      (axios.patch as jest.Mock).mockResolvedValue({ data: mockCardSignageLink });
      const client = new signageApiClient('http://localhost', 'user', 'password');
      const result = await client.updateContentByCardIDm(
        '1234567890123456',
        'https://example.com',
        10,
      );

      const expectedCardSignageLink: CardSignageLink = {
        status: 'success',
        description: 'Succeeded updating content by cardIDm',
        cardIDm: '1234567890123456',
        url: 'https://example.com',
        displaySeconds: 10,
      };

      expect(result).toEqual(expectedCardSignageLink);
      expect(axios.patch).toHaveBeenCalledWith(
        'http://localhost/api/v1/signage/cards/1234567890123456',
        { url: 'https://example.com', display_seconds: 10 },
        { headers: { Authorization: expect.any(String), 'Content-Type': 'application/json' } },
      );
    });

    it('更新に失敗した場合はエラーをスローするべきです', async () => {
      (axios.patch as jest.Mock).mockRejectedValue(
        new Error('Failed to update content by cardIDm'),
      );
      const client = new signageApiClient('http://localhost', 'user', 'password');
      const result = client.updateContentByCardIDm('1234567890123456', 'https://example.com', 10);

      await expect(result).rejects.toThrow('Failed to update content by cardIDm');
    });
  });
});