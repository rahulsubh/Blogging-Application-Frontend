import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import { loadAllPosts } from '../services/post-service';
import Post from './Post';

function NewFeed() {

    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''
    });

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        //load all the posts from server.
        changePage(currentPage);
    }, [currentPage]);

    const changePage = (pageNumber = 0, pageSize = 5) => {

        // console.log(pageNumber);
        // console.log(postContent.pageNumber);
        if (pageNumber > postContent.pageNumber && postContent.lastPage) {
            return;
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
            return;
        }
        loadAllPosts(pageNumber, pageSize).then(data => {
            setPostContent({
                content: [...postContent.content, ...data.content],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            });
            console.log(data);
        }).catch(error => {
            toast.error("Error in loading post");
        });
    };

    const changePageInfinite = () => {
        console.log("page changed");
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="container-fluid">
            <Row>
                <Col md={
                    {
                        size: 10,
                        offset: 1
                    }
                }>
                    <h1>Blogs Content ({postContent?.totalElements})</h1>

                    <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={!postContent.lastPage}
                    >
                        {
                            postContent.content.map((post) => (
                                <Post post={post} key={post.postId} />
                            ))
                        }
                    </InfiniteScroll>

                    {/* <Container className="mt-3">
                        <Pagination size='lg'>
                            <PaginationItem onClick={() => changePage(postContent.pageNumber - 1)} disabled={postContent.pageNumber === 0}>
                                <PaginationLink previous>
                                    Previous
                                </PaginationLink>
                            </PaginationItem>
                            {
                                [...Array(postContent.totalPages)].map((item, index) => (
                                    <PaginationItem onClick={() => changePage(index)} active={index === postContent.pageNumber} key={index}>
                                        <PaginationLink>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))
                            }
                            <PaginationItem onClick={() => changePage(postContent.pageNumber + 1)} disabled={postContent.lastPage}>
                                <PaginationLink next>
                                    Next
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Container> */}
                </Col>
            </Row>
        </div>
    )
}

export default NewFeed