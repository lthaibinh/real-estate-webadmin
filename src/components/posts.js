import React, { useEffect, useState } from "react";
import {
  NumberField,
  FunctionField,
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
  useDataProvider,
  AutocompleteInput,
  useNotify
} from "react-admin";
import { useMutation } from "react-query";

// import { createTheme, Box, Typography } from '@material-ui/system';
import Box from '@material-ui/core/Box';

import { useGetList } from 'react-admin';


const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};
const PostShow = () => (
  <SimpleShowLayout>
    <TextField source="description"
      style={{
        whiteSpace: 'pre-wrap',
      }}
    />
    <ArrayField source="infoOfRealEstate.image">
      <Datagrid bulkActionButtons={false}>
        <ImageField source="url" src="url" title="name" />
        <TextField source="name" />
      </Datagrid>
    </ArrayField>
  </SimpleShowLayout>
);

// fungsi untuk melihat semua daftar post
export const PostList = props => (
  <List filters={<PostFilter />} {...props}>
    <Datagrid expand={<PostShow />}>
      <TextField source="id" />
      {/* <ReferenceField source="userId" reference="users">
        <TextField source="name" />
      </ReferenceField> */}
      <TextField source="title" />
      <TextField source="categoryOfRealEstate.name" label={"type"} />
      <FunctionField
        source="addressOfRealEstate"
        label="Name"
        render={record => {
          let { street, ward, district, province } = record.addressOfRealEstate
          return `${street._prefix} ${street._name}, ${ward._prefix} ${ward._name}, ${district._prefix} ${district._name}, ${province._name}`
        }}
      />;
      <NumberField
        source="infoOfRealEstate.price"
        locales="vi-VI" options={{ style: 'currency', currency: 'VND' }}
      />
      <EditButton />
    </Datagrid>
  </List>
);

// fungsi untuk mengubah post
export const PostEdit = props => {

  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [streetList, setStreetList] = useState([]);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  useEffect(() => {
    callApi('http://localhost:9090/api/v1/province').then(e => {
      setProvinceList(e)
    })
  }, [])

  useEffect(() => {
    if (provinceId) {
      callApi(`http://localhost:9090/api/v1/district/${provinceId}`).then(e => {
        setDistrictList(e)
      })
    }

  }, [provinceId])


  useEffect(() => {
    if (provinceId && districtId) {
      callApi(`http://localhost:9090/api/v1/ward/${provinceId}/${districtId}`).then(e => {
        setWardList(e)
      })
      callApi(`http://localhost:9090/api/v1/street/${provinceId}/${districtId}`).then(e => {
        setStreetList(e)
      })
    }

  }, [provinceId, districtId])

  const transform = async data => {
    let { infoOfRealEstate } = data
    let { image: images } = infoOfRealEstate

    let newimages = await Promise.all(images.map(async (element) => {

      if (element.rawFile) {
        let image = element.rawFile
        let rawBase64 = await toBase64(image)
        let base64 = rawBase64.split(',')[1]
        let fileName = element.name
        return {
          fileName,
          base64
        }
      }
      return null
    }))
    newimages = newimages.filter(e => e !== null)


    return ({
      post: {
        ...data,
        infoOfRealEstate: {
          ...infoOfRealEstate,
          image: images.filter(e => !e.rawFile)
        }
      },
      newBase64Images: newimages
    })
  };
  return (
    <Edit title={<PostTitle />} {...props} transform={transform}>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput multiline source="description" fullWidth />
        <ReferenceInput label="Category" source="categoryOfRealEstate.id" reference="category">
          <SelectInput />
        </ReferenceInput>
        <Box maxWidth={false} display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <SelectInput
              label="Province"
              source="addressOfRealEstate.province"
              choices={provinceList}
              optionText="_name"
              optionValue="id"
              fullWidth
              onChange={
                (event) => {
                  let id = event.target.value
                  setProvinceId(id)
                }
              }
            
            />
            {/* <ReferenceInput label="Province" fullWidth source="addressOfRealEstate.province.id" reference="province">
              <SelectInput
                optionText="_name"
                onChange={
                  (event) => {
                    let id = event.target.value
                    setProvinceId(id)
                  }
                } />
            </ReferenceInput> */}
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <SelectInput
              label="District"
              source="addressOfRealEstate.district"
              choices={districtList}
              optionText={
                row => {
                  let { _prefix, _name } = row;
                  return _prefix + ' ' + _name;
                }
              }
              optionValue="id"
              fullWidth
              onChange={
                (event) => {
                  let id = event.target.value
                  setDistrictId(id)
                }
              }
            // defaultValue={1}
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <SelectInput
              label="Ward"
              source="addressOfRealEstate.ward"
              choices={wardList}
              optionText={
                row => {
                  let { _prefix, _name } = row;
                  return _prefix + ' ' + _name;
                }
              }
              optionValue="id"
              fullWidth
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <SelectInput
              label="Street"
              source="addressOfRealEstate.street"
              choices={streetList}
              optionText={
                row => {
                  let { _prefix, _name } = row;
                  return _prefix + ' ' + _name;
                }
              }
              optionValue="id"
              fullWidth
            />
          </Box>
        </Box>

        {/* info */}
        <NumberInput source="infoOfRealEstate.area" />
        <NumberInput source="infoOfRealEstate.price" />
        <TextInput source="infoOfRealEstate.monetary_unit" label="unit" />
        <TextInput source="infoOfRealEstate.legal_documentation" label="legal" />
        <NumberInput source="infoOfRealEstate.num_bedrooms" />
        <NumberInput source="infoOfRealEstate.num_bathrooms" />

        <ImageInput source="infoOfRealEstate.image" label="Billede" accept="image/*" multiple >
          <ImageField source="url" title="name" />
        </ImageInput>

      </SimpleForm>
    </Edit>
  )
};


// fungsi untuk membuat post
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});


const callApi = (path) => {
  const request = new Request(path, {
    method: 'GET',
  })
  return fetch(request)
    .then(response => {
      // if (response.status < 200 || response.status >= 300) {
      //   throw new Error(response.statusText);
      // }
      return response;
    })
    .then((res) => {
      return Promise.resolve(res.json());
    })
    .catch(e => {
      return Promise.reject();
    })
}

export const PostCreate = props => {

  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [streetList, setStreetList] = useState([]);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);


  const { data, total, isLoading, error } = useGetList(
    'category'
  );

  useEffect(() => {
    callApi('http://localhost:9090/api/v1/province').then(e => {
      setProvinceList(e)
    })
  }, [])

  useEffect(() => {
    if (provinceId) {
      callApi(`http://localhost:9090/api/v1/district/${provinceId}`).then(e => {
        setDistrictList(e)
      })
    }

  }, [provinceId])


  useEffect(() => {
    if (provinceId && districtId) {
      callApi(`http://localhost:9090/api/v1/ward/${provinceId}/${districtId}`).then(e => {
        setWardList(e)
      })
      callApi(`http://localhost:9090/api/v1/street/${provinceId}/${districtId}`).then(e => {
        setStreetList(e)
      })
    }

  }, [provinceId, districtId])

  let categoryList = data && Array.isArray(data) ? data : Object.values(data)

  const transform = async data => {
    let { title, description, category_id, images, provinceId, districtId, wardId, streetId } = data

    let newimages = await Promise.all(images.map(async (element) => {
      let image = element.rawFile
      let rawBase64 = await toBase64(image)
      let base64 = rawBase64.split(',')[1]
      let fileName = element.title
      return {
        fileName,
        base64
      }
    }))

    let info_id = {
      area: data.area,
      price: data.price,
      monetary_unit: data.monetary_unit,
      legal_documentation: data.legal_documentation,
      num_bedrooms: data.num_bedrooms,
      num_bathrooms: data.num_bathrooms,

    }
    return ({
      title,
      description,
      address: {
        provinceId,
        districtId,
        wardId,
        streetId
      },
      category_id,
      info_id,
      images: newimages
    })
  };
  return (
    <Create {...props} transform={transform} >
      <SimpleForm>
        <TextInput fullWidth source="title" />
        <TextInput fullWidth multiline source="description" component="pre" />

        <Box maxWidth={false} display={{ xs: 'block', sm: 'flex', width: '100%' }}>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <SelectInput
              label="Province"
              source="provinceId"
              choices={provinceList}
              optionText="_name"
              optionValue="id"
              fullWidth
              onChange={
                (event) => {
                  let id = event.target.value
                  setProvinceId(id)
                }
              }
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <SelectInput
              label="District"
              source="districtId"
              choices={districtList}
              optionText={
                row => {
                  let { _prefix, _name } = row;
                  return _prefix + ' ' + _name;
                }
              }
              optionValue="id"
              fullWidth
              onChange={
                (event) => {
                  let id = event.target.value
                  setDistrictId(id)
                }
              }
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <SelectInput
              label="Ward"
              source="wardId"
              choices={wardList}
              optionText={
                row => {
                  let { _prefix, _name } = row;
                  return _prefix + ' ' + _name;
                }
              }
              optionValue="id"
              fullWidth
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
            <SelectInput
              label="Street"
              source="streetId"
              choices={streetList}
              optionText={
                row => {
                  let { _prefix, _name } = row;
                  return _prefix + ' ' + _name;
                }
              }
              optionValue="id"
              fullWidth
            />
          </Box>
        </Box>
        <SelectInput
          source="category_id"
          choices={categoryList}
          optionText="name"
          optionValue="id"
          isLoading={isLoading}
        />
        {/* info */}
        <NumberInput source="area" />
        <NumberInput source="price" />
        <TextInput source="monetary_unit" />
        <TextInput source="legal_documentation" />
        <NumberInput source="num_bedrooms" />
        <NumberInput source="num_bathrooms" />

        <ImageInput source="images" multiple placeholder={<p>Drop your file here</p>}>
          <ImageField source="src" title="title" />
        </ImageInput>

      </SimpleForm>
    </Create>
  )
};

// fungsi untuk mencari post
const PostFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);
