import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, FlatList, AsyncStorage, Button, TextInput, Keyboard, Platform, TouchableWithoutFeedback } from "react-native";
const isAndroid = Platform.OS == "android";
const viewPadding = 10;
import * as Linking from 'expo-linking';
import { WebView } from 'react-native-webview';


export default class NodeList extends Component {

    constructor(props) {
        super(props);
        this.WEBVIEW_REF = React.createRef();
      }
         
    
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    
    handleBackButton = ()=>{
       this.WEBVIEW_REF.current.goBack();
       return true;
    }
    
    onNavigationStateChange(navState) {
      this.setState({
        canGoBack: navState.canGoBack
      });
    } 
    

  state = {
    tasks: [ ], 
    text: ""
  };

  changeTextHandler = text => {
    this.setState({ text: text });
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;


    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text } = prevState;
          return {
            tasks: tasks.concat({ key: tasks.length, text: text }),
            text: ""
          };
        },
        () => Tasks.save(this.state.tasks)
      );
    }
  };


  


  deleteTask = i => {
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();

        tasks.splice(i, 1);

        return { tasks: tasks };
      },
      () => Tasks.save(this.state.tasks)
    );
  };

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewMargin: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewMargin: viewPadding })
    );

    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }

  render() {
    return (
      <View
        style={[styles.container, { paddingBottom: this.state.viewMargin }]}
      >
         <Text style={styles.appTitle}>Nodes</Text>
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemCont}>
              <TouchableWithoutFeedback onPress={() => {Linking.openURL(`https://${item.text}`)}}>
                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                </TouchableWithoutFeedback>
                <Button color= "#00BC8C" title="&#10006;" onPress={() => this.deleteTask(index)} />
              </View>
              <View style={styles.hr} />
            </View>}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="+ add Node"
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
      
    );
  }
}

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task, url: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: viewPadding,
    paddingTop: 24
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 4,
    paddingBottom: 2,
    fontSize: 18,
    color:"#ffff"
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: isAndroid ? 0 : 1,
    width: "100%",
    color:"#ffff"
  },
appTitle: {
  alignItems:"center",
  justifyContent: "center",
  paddingBottom: 45,
  marginTop: 50,
  fontSize: 25,
  color:"#ffff"
}
});

AppRegistry.registerComponent("NodeList", () => NOdeList);
