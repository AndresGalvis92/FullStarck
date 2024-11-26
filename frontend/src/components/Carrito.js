import React from 'react';

const Carrito = () => {
    return (

    <>
        <div className="row m-5">
            <div className="col">
                <div classNameName="container text-center mt-5">
                    <h2> 
                        <p className="text-center">Tu Carrito de Compras </p>
                    </h2>
                    <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
    );
};

export default Carrito;
