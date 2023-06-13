import React from "react";
import { Admin, Resource } from "react-admin";
import { PostList, PostEdit, PostCreate } from "./components/posts";
import { CategoryList, CategoryEdit, CategoryCreate, binhtest } from "./components/category";


import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import ListAlt from "@material-ui/icons/ListAlt";



import Dashboard from "./Dashboard";
import authProvider from "./authProvider";
import jsonServerProvider from "ra-data-json-server";
import LoginPage from "./components/LoginPage";
import { UserList, UserCreate, UserEdit } from "./components/User";
import { QueryClient, QueryClientProvider } from 'react-query';

const dataProvider = jsonServerProvider("http://localhost:9090/api/v1");
//const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");




const App = () => (
  <Admin

    dashboard={Dashboard}
    authProvider={authProvider}
    loginPage={LoginPage}
    dataProvider={dataProvider}

  >
    <Resource
      name="post"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
    <Resource
      name="category"
      list={CategoryList}
      edit={CategoryEdit}
      create={CategoryCreate}
      icon={ListAlt}
    />
    <Resource
      name="user"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      icon={UserIcon}
    />

    {/* <Resource
      name="province"
      list={binhtest}
      icon={UserIcon}
    />
    <Resource
      name="district"
      list={binhtest}
      icon={UserIcon}
    />
    <Resource
      name="ward"
      list={binhtest}
      icon={UserIcon}
    />
    <Resource
      name="street"
      list={binhtest}
      icon={UserIcon}
    /> */}


    {/* <Resource name="users" list={UserList} icon={UserIcon} /> */}
  </Admin>

);

export default App;
