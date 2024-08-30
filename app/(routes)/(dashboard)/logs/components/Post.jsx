'use client';
import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";


const handleClick = () => {

}
const Post = ({product}) => {
    return (
        <div className="flex flex-col justify-between items-center bg-slate-200 m-4 p-2 rounded-xl h-full">
            <div className="text-center">
                <h1 className="font-bold text-center mb-4">{product.id}. {product.title}</h1>
                <p className="text-center">{product.price}</p>
                <p className={`text-center ${product.stock === 0 ? "text-red-500" : "text-green-500"}`}>{product.stock}</p>
                {product.reviews.map((review) => {
                    <p>{review.comment}</p>
                })}
            </div>



            <img1 src={`${product.thumbnail}`} alt={product.title} width={200} height={200}/>

            <Link href={`logs/${product.id}`}>


                <Button onClick={handleClick} className="mt-2">Ver más</Button>
                
            </Link>
        </div>
    );
};


export default Post;