
export  const signupFormControl = [
    {
        name: 'userName',
        label: 'User Name',
        placeholder: 'Enter your name',
        componentType: 'input',
        type: 'text'
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        componentType: 'input',
        type: 'email'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password'
    },
];

export const loginFormControl = [
    {
name: 'email',
label: 'Email',
placeholder: 'Enter your email',
componentType: 'input',
type: 'email'
    }
];

export const userProfile = [
    {
        name: "name",
        label: "Name",
        placeholder: "Enter your name",
        componentType: "input",
        type: "text",
    },
    {
        name: "gender",
        label: "Gender",
        placeholder: "Select your gender",
        componentType: "select",
        type: "text", // Change type to "text" for select
        options: [
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
        ],
    },
    {
        name: "image",
        label: "Image URL",
        placeholder: "Enter image URL",
        componentType: "input",
        type: "text",
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        componentType: "input",
        type: "email",
    },
]

export const profileadFormControl = [
    {
        name: "name",
        label: "Name",
        placeholder: "Enter your name",
        componentType: "input",
        type: "text",
    },
    {
        name: "title",
        label: "Title",
        placeholder: "Select your title",
        componentType: "select", // Use "select" for dropdown
        type: "text", // Change type to "text" for select
        options: [
            { value: "HouseKeeper", label: "HouseKeeper" },
            { value: "Nanny", label: "Nanny" },
            { value: "Cook", label: "Cook" },
            { value: "Driver", label: "Driver" },
            { value: "Gardner", label: "Gardner" },
            { value: "Caregiver", label: "Caregiver" },
            { value: "Security Guard", label: "Security Guard" },
            { value: "Laundry Attendant", label: "Laundry Attendant" },
            { value: "Babysitter", label: "Babysitter" },
        ],
    },
    {
        name: "gender",
        label: "Gender",
        placeholder: "Select your gender",
        componentType: "select",
        type: "text", // Change type to "text" for select
        options: [
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
        ],
    },
    {
        name: "image",
        label: "Image URL",
        placeholder: "Enter image URL",
        componentType: "input",
        type: "text",
    },
    {
        name: "address",
        label: "Address",
        placeholder: "Enter your address",
        componentType: "input",
        type: "text",
    },
    {
        name: "city",
        label: "City",
        placeholder: "Enter your city",
        componentType: "input",
        type: "text",
    },
    {
        name: "phone",
        label: "Phone",
        placeholder: "Enter your phone number",
        componentType: "input",
        type: "number",
    },
    {
        name: "description",
        label: "Description",
        placeholder: "Tell us about yourself",
        componentType: "textarea",
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        componentType: "input",
        type: "email",
    },
];


export const ServiceCategory = [
    
"HouseKeeper",
"Nanny",
"Cook",
"Driver",
"Gardner",
"Caregiver",
"Security Guard",
"Laundry Attendant",
"Babysitter"


]

export const historyAdmin = [

    {  _id: 1, name: "Aisha ", title: "Babysitter", date: "1672531199000" },
    {  _id: 2, name: "Bello ", title: "Babysitter", date: "1672531199000" },
    {  _id: 3, name: "Khad ", title: "Babysitter", date: "1672531199000" },
    {  _id: 4, name: "Chad ", title: "Babysitter", date: "1672531199000" },
    {  _id: 5, name: "Lilly ", title: "Babysitter", date: "1672531199000" },

]

export const historyUser = [
    {  _id: 1, name: "Maimuna ", date: "1672531199000" },
    {  _id: 2, name: "Islam ", date: "1672531199000" },
    {  _id: 3, name: "Nana ", date: "1672531199000" },
    {  _id: 4, name: "Hamis ", date: "1672531199000" },
    {  _id: 5, name: "Glory ", date: "1672531199000" },
  
]


export const  viewUserRequest = [
    {  _id: 1, name: "Samuel Sanford", title: "Nanny", image: "URL" },
    {  _id: 2, name: "Aisha ", title: "Babysitter", image: "URL" },
    {  _id: 3, name: " isa", title: "Cook", image: "URL" },
    {  _id: 4, name: "john Peter", title: "Driver", image: "URL" },
    {  _id: 5, name: "Mercy", title: "Nanny", image: "URL" },
    {  _id: 6, name: "Joy", title: "Nanny", image: "URL" },
    ]



