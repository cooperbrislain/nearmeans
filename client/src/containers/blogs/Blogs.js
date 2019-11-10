import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogs } from './../../actions';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner'

class Blogs extends Component {
    componentDidMount(){
        this.props.fetchBlogs();
    }

    renderBlogs() {
        if(this.props.blogs.length === 0) {
            return (
                <Loader
                type="Oval"
                color="purple"
                height={100}
                width={100}                                  
             />
            )
        } else {
            return (
                <div>
                {
                    this.props.blogs.map(blog => {
                        return (
                            <div key={blog._id}>
                                <Link to={`/blogs/${blog._id}`}>{blog.content}</Link>
                                <p>{blog.user.email}</p>
                            </div>
                        )
                    })
                }
                </div>
            )
        }
    }

    render(){
        console.log(this.props);
        return (
            <div>
                <h1>Welcome to the blogs page</h1>
                { this.renderBlogs() }
            </div>
        );
    }
}


function mapStateToProps({ blogs }) {
    return {blogs: blogs.blogs };
}

export default connect(mapStateToProps, { fetchBlogs })(Blogs);