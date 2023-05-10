import React from "react";
import {
  NumberField,
  FunctionField,
  useCreate,
  ImageInput,
  List,
  SimpleList,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  Edit,
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  Filter,
  RichTextField,
  ImageField,
  NumberInput,
  ArrayField,
  SimpleFormIterator,
  FormDataConsumer,
  Labeled,
  SimpleShowLayout,
  ChipField,
  BooleanField,
  SingleFieldList,
  CheckboxGroupInput,
  ReferenceArrayInput,
  ArrayInput
} from "react-admin";

const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.title}"` : ""}</span>;
};

// fungsi untuk melihat semua daftar post
export const UserList = props => (
  <List filters={<UserFilter />} {...props}>
    <Datagrid >
      <TextField source="id" />

      <TextField source="username" />
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="email" />
      <BooleanField source="enabled" />
      <ArrayField source="role">
        <SingleFieldList sx={{ my: -2 }}>
          <ChipField source="name" size="small" />
        </SingleFieldList>
      </ArrayField>
      <EditButton />
    </Datagrid>
  </List>
);

// fungsi untuk mengubah post
export const UserEdit = props => {
  const transform = data => {
    let { id, role, ...rest } = data
    console.log("1", role);
    role = role.map(e => e.id).filter(e => e)
    console.log("2", role);
    return {
      ...rest,
      role
    }
  }
  return (
    <Edit title={<UserTitle />} {...props} transform={transform} >
      <SimpleForm>
        {/* <TextInput fullWidth source="username" /> */}
        <TextInput fullWidth source="firstname" />
        <TextInput fullWidth source="lastname" />
        <TextInput fullWidth source="email" />

        <CheckboxGroupInput
          source="role"
          choices={[
            { id: 1, name: 'ADMIN' },
            { id: 2, name: 'USER' }
          ]}
          optionValue="id"
          optionText="name"
          parse={ids => {
            console.log('ids', ids, ids.map(id => ({ id })))
            return ids.map(id => ({ id }))
          }}
          format={bindedCameras => {
            console.log('bindedCameras', bindedCameras)
            return bindedCameras.map(b => b.id)
          }}
        />

      </SimpleForm>
    </Edit>
  )
};




export const UserCreate = props => {

  return (
    <Create {...props}  >
      <SimpleForm>
        <TextInput fullWidth source="username" />
        <TextInput fullWidth source="firstname" />
        <TextInput fullWidth source="lastname" />
        <TextInput fullWidth source="email" />
        <TextInput fullWidth source="password" />
        <CheckboxGroupInput source="role" choices={[
          { id: 1, name: 'ADMIN' },
          { id: 2, name: 'USER' }
        ]} />
      </SimpleForm>
    </Create>
  )
};

// fungsi untuk mencari post
const UserFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);
