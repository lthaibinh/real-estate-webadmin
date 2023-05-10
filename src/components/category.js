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
  SimpleShowLayout
} from "react-admin";

const CategoryTitle = ({ record }) => {
  return <span>Category {record ? `"${record.title}"` : ""}</span>;
};

// fungsi untuk melihat semua daftar post
export const CategoryList = props => (
  <List filters={<CategoryFilter />} {...props}>
    <Datagrid >
      <TextField source="id" />
      {/* <ReferenceField source="userId" reference="users">
        <TextField source="name" />
      </ReferenceField> */}
      <TextField source="name" />
     
      <EditButton />
    </Datagrid>
  </List>
);
export const binhtest = props => (
  <List filters={<CategoryFilter />} {...props}>
    <Datagrid >
      <TextField source="id" />
      {/* <ReferenceField source="userId" reference="users">
        <TextField source="name" />
      </ReferenceField> */}
      <TextField source="_name" />
     
      <EditButton />
    </Datagrid>
  </List>
);
// fungsi untuk mengubah post
export const CategoryEdit = props => {
  // const transform = async data => {
  //   let { infoOfRealEstate } = data
  //   let { image: images } = infoOfRealEstate

  //   let newimages = await Promise.all(images.map(async (element) => {

  //     if (element.rawFile) {
  //       let image = element.rawFile
  //       let rawBase64 = await toBase64(image)
  //       let base64 = rawBase64.split(',')[1]
  //       let fileName = element.name
  //       return {
  //         fileName,
  //         base64
  //       }
  //     }
  //     return null


  //   }))
  //   newimages = newimages.filter(e => e !== null)


  //   return ({
  //     post: {
  //       ...data,
  //       infoOfRealEstate: {
  //         ...infoOfRealEstate,
  //         image: images.filter(e => !e.rawFile)
  //       }
  //     },
  //     newBase64Images: newimages
  //   })
  // };
  return (
    <Edit title={<CategoryTitle />} {...props} >
      <SimpleForm>
        <TextInput source="name" />
      </SimpleForm>
    </Edit>
  )
};




export const CategoryCreate = props => {
  
  return (
    <Create {...props}  >
      <SimpleForm>
        <TextInput fullWidth source="name" />
      </SimpleForm>
    </Create>
  )
};

// fungsi untuk mencari post
const CategoryFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);
