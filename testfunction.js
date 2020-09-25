import React, { Component, useState } from "react";
import { BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
var $ = require( "jquery" );


export default function viewscreen() {

        return (
         <WebView
             source={{ uri: `https://${item.text}` }}
             ref={this.WEBVIEW_REF}
             style={{ marginTop: 20 }}
             onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          />
         )
        
      
}