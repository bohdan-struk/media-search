import axios from 'axios';
import {renderHook, act} from '@testing-library/react';
import useSearch from '../src/composables/useSearch';
import {describe, it, expect} from "vitest";

vi.mock('axios');

describe('useSearch', () => {
  it('fetches photos when searchPhotos is called', async () => {
    const mockResponse = {
      data: {
        results: [{id: '1', description: 'Photo 1'}, {id: '2', description: 'Photo 2'}],
        total_pages: 1,
      },
    };

    axios.get.mockResolvedValueOnce(mockResponse);

    const {result} = renderHook(() => useSearch());

    await act(async () => {
      await result.current.searchPhotos('cats');
    });

    expect(result.current.photos).toHaveLength(2);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.failed).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it('handles errors when searchPhotos encounters an error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    const {result} = renderHook(() => useSearch());
    await act(async () => {
      await result.current.searchPhotos('dogs');
    });

    expect(result.current.photos).toHaveLength(0);
    expect(result.current.totalPages).toBeUndefined();
    expect(result.current.failed).toBe(true);
    expect(result.current.loading).toBe(false);
  });
});
