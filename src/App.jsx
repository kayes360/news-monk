import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News"; 
import { BrowserRouter,  Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize=15;
  apiKey=import.meta.env.VITE_NEWS_API;
  state={
    progress: 0
  }
  const setProgress=(progress)=>{
    this.setState({progress})
  }
   
  render() {
    
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color="#1941f1" 
            progress={this.state.progress}
            onLoaderFinished={() => setProgress(0)}
            height={3}
          />
            <Routes>
                  <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" />} />   
                  <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business" />} /> 
                  <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} /> 
                  <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health" />} /> 
                  <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science" />} /> 
                  <Route exact path="/sport" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports" />} /> 
                  <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />  
            </Routes>
             
        </BrowserRouter>
      </>
    );
  }
}
