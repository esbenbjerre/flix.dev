import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import Editor from "../util/Editor";

import NewsData from '../data/News.js'
import SamplesData from '../data/Samples.js'

class Home extends Component {
    render() {
        return (
            <Container>
                <Row className="mb-3">
                    <Col xs="6">
                        <h1 className="font-weight-bold">A principled functional language that runs on the JVM</h1>

                        <p>
                            Flix is a principled and opinionated functional programming language that takes inspiration
                            from F#, Go, OCaml, Haskell, Rust, and Scala.
                        </p>

                        <p>
                            Flix visually resembles Scala, but its type system is closer to that of OCaml and Haskell.
                            Its concurrency model is inspired by Go-style processes and channels.
                        </p>

                        <p>
                            Flix compiles to JVM bytecode and runs on the Java Virtual Machine.
                            Flix supports full tail call elimination. Its performance is within a few factors of Scala.
                        </p>

                        <p>
                            Research on Flix explores connections between functional and logic programming in the
                            area of declarative fixpoint computations.
                        </p>

                    </Col>
                    <Col xs="6">
                        <Codebox flix={this.props.flix}/>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md="12">
                        <h2>Features at a Glance</h2>
                    </Col>
                    <Col md="4" style={{"fontSize": '1.2em'}}>
                        <ul>
                            <li>algebraic data types</li>
                            <li>pattern matching</li>
                            <li>first-class functions</li>
                            <li>parametric polymorphism</li>
                            <li>Hindley-Milner type inference</li>
                        </ul>
                    </Col>
                    <Col md="4" style={{"fontSize": '1.2em'}}>
                        <ul>
                            <li>channel-based concurrency</li>
                            <li>first-class datalog constraints</li>
                            <li>namespaces</li>
                            <li>garbage collected</li>
                            <li>typed holes</li>
                        </ul>
                    </Col>
                    <Col md="4" style={{"fontSize": '1.2em'}}>
                        <ul>
                            <li>full tail call elimination</li>
                            <li>compiles to JVM bytecode</li>
                            <li>core standard library</li>
                            <li>human friendly errors</li>
                            <li>interactive mode</li>
                        </ul>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs="6">
                        <h3>Recent News</h3>
                        <ul>
                            {NewsData().map(item =>
                                <li key={item.name}>
                                    {item.date} - {item.name}
                                    <br/>
                                </li>
                            )}
                        </ul>
                    </Col>

                    <Col xs="6">
                        <h3>Bread- and Butter Functional Programming</h3>

                        <p>
                            Flix supports the basic building blocks of typed functional programs:
                            algebraic data types, pattern matching, and parametric polymorphism (generics).
                            It uses a Hindley-Milner style type system which supports local type inference with
                            a function. Its syntax is inspired by Scala with an emphasis on the use of keywords.
                        </p>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs="6">
                        <h3>Process and Channel-based Concurrency</h3>
                        <p>
                            Flix embraces a Go-style concurrency model based on processes and channels. Processes
                            communicate by sharing immutable messages which help prevent race conditions. Our
                            implementation is currently based on threads, but once the JVM gains support for
                            light-weight threads or support for continuations we can change the backend to use those
                            features.
                        </p>
                    </Col>

                    <Col xs="6">
                        <h3>Principled Design</h3>

                        <p>

                            <strike> Flix is built on a set of design principles. It is our hope that these principles
                                leads us to a consistent design that fits a particular set of use cases. We aim to build
                                a language with a strong foundation in programming language feature combined with
                                knowledge learned of the past thirty years. Flix aims to take many of the best ideas
                                from
                                languages such as OCaml, Haskell, Rust, and Scala and incorporate them into a new
                                language.</strike>
                        </p>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs="6">
                        <h3>Planned Features</h3>

                    </Col>

                    <Col xs="6">
                        <h3>Research and Flix</h3>

                        <p>
                            Flix is also a research project to explore various aspects of programming language design.
                            A large part of the research explores connections between functional and logic programming,
                            specifically Datalog and extensions of Datalog. Flix, as probably the only language in the
                            world, supports first-class Datalog constraints enriched with lattice semantics.
                        </p>

                        <p>
                            For more information, we refer to our research papers.
                        </p>
                    </Col>
                </Row>

            </Container>
        );
    }
}

class Codebox extends Component {

    constructor(props) {
        super(props);
        let samples = SamplesData();
        let randomChoice = getRandomInt(samples.length);
        this.state = {choice: randomChoice, samples: samples};
    }

    onChange(event) {
        let newChoice = event.target.value;
        this.setState({choice: newChoice});
    }

    getEditor() {
        let choice = this.state.choice;
        let sample = this.state.samples[choice];
        // NB: The use of the key ensures that the editor is refreshed when the dropdown is changed.
        return <Editor key={sample.name} flix={this.props.flix} code={sample.code} lines={18}>{sample.code}</Editor>
    }

    render() {
        return (
            <Container>
                <select className="mb-2" value={this.state.choice} onChange={this.onChange.bind(this)}>
                    {this.state.samples.map((sample, index) =>
                        <option key={index} value={index}>{sample.name}</option>)
                    }
                </select>
                {this.getEditor()}
            </Container>
        );
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export default Home;
