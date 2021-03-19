import React from 'react'
import { Link } from 'react-router-dom'

function Carousel({posts}) {
    return (
        <div >
            {posts && 
                <div style={{position: 'relative'}} className="carousel slide mt-4 mb-4" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div style={{height: '200px'}} class="carousel-inner">
                        <div className='carousel-item active'>
                            <div className='card' style={{width: '75%', margin:'auto'}}>
                                <div className='card-body d-flex flex-column justify-content-center'>
                                    <h5 className='card-title'>{posts[0].postName}</h5>
                                    <p className='card-text'>{posts[0].summary}</p>
                                    <Link className='btn btn-primary'>Читать</Link>
                                </div>
                            </div>
                        </div>
                        <div className='carousel-item'>
                            <div className='card' style={{width: '75%', margin:'auto'}}>
                                <div className='card-body d-flex flex-column justify-content-center'>
                                    <h5 className='card-title'>{posts[1].postName}</h5>
                                    <p className='card-text'>{posts[1].summary}</p>
                                    <Link className='btn btn-primary'>Читать</Link>
                                </div>
                            </div>
                        </div> 
                        <div className='carousel-item'>
                            <div className='card' style={{width: '75%', margin:'auto'}}>
                                <div className='card-body d-flex flex-column justify-content-center'>
                                    <h5 className='card-title'>{posts[2].postName}</h5>
                                    <p className='card-text'>{posts[2].summary}</p>
                                    <Link className='btn btn-primary'>Читать</Link>
                                </div>
                            </div>
                        </div>                   
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            }
        </div>
    )
}

export default Carousel
