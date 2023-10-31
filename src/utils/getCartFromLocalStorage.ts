export const GetCartFromLocalStorage = () => {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
}