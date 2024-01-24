export const request = async <T>(url: string, method: string, body?: T) => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return { response, data };
};

export const get = <T>(url: string) => request<T>(url, 'GET');
export const post = <T>(url: string, body: T) => request<T>(url, 'POST', body);
export const put = <T>(url: string, body: T) => request<T>(url, 'PUT', body);
export const del = <T>(url: string) => request<T>(url, 'DELETE');
