// pagge for one single full post + comment

import React, { Component } from 'react'
import TopNav from '../Components/TopNav'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { PlusLg } from "react-bootstrap-icons";

class Article extends Component {
    render() {
        return (
            <Row>
          <Col lg={2} md={1} className="d-none d-lg-block d-md-block"></Col>
          
          <Col lg={8} md={10} xs={12}>
            <TopNav />
            
<article >
<h2 className="mb-1">New feature</h2>
<p className="">December 14, 2020 by <a href="#">Chris</a></p>

<p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
<ul>
<li>First list item</li>
<li>Second list item with a longer description</li>
<li>Third list item to close it out</li>
</ul>
<p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout.</p>
</article>
          </Col>

          <Col lg={2} md={1} className="d-none d-lg-block d-md-block"></Col>
        </Row>
        )
    }
}

export default Article