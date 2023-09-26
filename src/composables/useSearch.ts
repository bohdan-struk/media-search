import { useState } from "react";
import axios from "axios";

const apiKey = 'ukJyK7f_oSD8sRs6GytnZxaxCnv8XCiFi05QKrF_BeQ';

const useSearch = (): { totalPages: number | undefined; searchPhotos: (query: string, page?: number, color?: string, order?: string) => Promise<void>; failed: boolean; loading: boolean; photos: any[] } => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [totalPages, setTotalPages] = useState<number | undefined>();

  const searchPhotos = async (query: string, page: number = 1, color?: string, order?: string) => {
    if (query.trim() === '') {
      return;
    }

    setPhotos([]);
    setLoading(true);
    setFailed(false);

    try {
      const params: Record<string, any> = {
        query: query,
        client_id: apiKey,
        page: page,
        order_by: order,
      };

      if (color !== "") {
        params.color = color;
      }

      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params,
      });

      setPhotos(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching data from Unsplash:', error);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    photos,
    searchPhotos,
    loading,
    failed,
    totalPages,
  };
};

export default useSearch;
