import React from 'react';
import Post from "@/app/(routes)/(dashboard)/logs/components/Post";

async function getProducts() {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    //Como agarro solo el array de productos de data?
    return data.products;
}

const LogsPage = async () => {

    const products = await getProducts();
    return (
        <div>
            <div className="items-center flex justify-center">
                <h1 className="text-2xl font-bold">Productos</h1>
                <p className="">Hay un total de {products.length} prpductos:</p>
            </div>
            <div className="grid grid-cols-3 gap-4 justify-between">
                {products.map((product) => (
                    <Post key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );
};

export default LogsPage;
