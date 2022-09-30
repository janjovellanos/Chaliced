import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState('');
    const products = useSelector(state => Object.values(state.products));

    const activeResults = products.filter(product => (
        product?.name?.toLowerCase().includes(search.toLowerCase())
        // || product?.price === (search)
    ));

    const listResults = activeResults.map(product => (
        <Link
            to={`/products/${product.id}`}
            key={product.id}
            onClick={() => setSearch('')}
        >
            <div>
                <div>{product?.name}</div>
                {/* <div>{product?.price}</div> */}
            </div>
        </Link>
    ))


    return (
        <div className="search-bar-container">
            <form className="search-bar-form">
                 <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={() => setResults("results-active")}
                        onBlur={() => setResults("")}
                        />
                 </div>
            </form>
            <div className={`search-results ${results}`}>{listResults}</div>
        </div>
    )
}
