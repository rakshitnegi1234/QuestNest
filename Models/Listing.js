const mongoose = require("mongoose");
const Review = require("./Review.js");
const User = require("./User.js");


const validCountry = [
    'Andorra', 'United Arab Emirates', 'Afghanistan', 'Antigua and Barbuda', 'Anguilla', 'Albania',
    'Armenia', 'Angola', 'Argentina', 'American Samoa', 'Austria', 'Australia', 'Aruba', 'Åland Islands',
    'Azerbaijan', 'Bosnia and Herzegovina', 'Barbados', 'Bangladesh', 'Belgium', 'Burkina Faso', 'Bulgaria',
    'Bahrain', 'Burundi', 'Benin', 'Saint Barthélemy', 'Bermuda', 'Brunei Darussalam', 'Bolivia',
    'Bonaire, Sint Eustatius and Saba', 'Brazil', 'Bahamas', 'Bhutan', 'Bouvet Island', 'Botswana',
    'Belarus', 'Belize', 'Canada', 'Cocos (Keeling) Islands', 'Democratic Republic of the Congo',
    'Central African Republic', 'Congo', 'Switzerland', 'Côte d\'Ivoire', 'Cook Islands', 'Chile',
    'Cameroon', 'China', 'Colombia', 'Costa Rica', 'Cuba', 'Cabo Verde', 'Curaçao', 'Christmas Island',
    'Cyprus', 'Czech Republic', 'Germany', 'Djibouti', 'Denmark', 'Dominica', 'Dominican Republic',
    'Algeria', 'Ecuador', 'Estonia', 'Egypt', 'Western Sahara', 'Eritrea', 'Spain', 'Ethiopia', 'Finland',
    'Fiji', 'Micronesia (Federated States of)', 'Faroe Islands', 'France', 'Gabon', 'United Kingdom',
    'Grenada', 'Georgia', 'French Guiana', 'Guernsey', 'Ghana', 'Gibraltar', 'Greenland', 'Gambia',
    'Guinea', 'Guadeloupe', 'Equatorial Guinea', 'Greece', 'Grenada', 'Guam', 'Guatemala', 'Guinea-Bissau',
    'Guyana', 'Hong Kong', 'Heard Island and McDonald Islands', 'Honduras', 'Croatia', 'Haiti', 'Hungary',
    'Indonesia', 'Ireland', 'Israel', 'Isle of Man', 'India', 'British Indian Ocean Territory', 'Iraq',
    'Iran', 'Iceland', 'Italy', 'Jersey', 'Jamaica', 'Jordan', 'Japan', 'Kenya', 'Kyrgyzstan', 'Cambodia',
    'Kiribati', 'Comoros', 'Saint Kitts and Nevis', 'North Korea', 'South Korea', 'Kuwait', 'Cayman Islands',
    'Kazakhstan', 'Laos', 'Lebanon', 'Saint Lucia', 'Liechtenstein', 'Sri Lanka', 'Liberia', 'Lesotho',
    'Lithuania', 'Luxembourg', 'Latvia', 'Libya', 'Morocco', 'Monaco', 'Moldova', 'Montenegro', 'Saint Martin',
    'Madagascar', 'Marshall Islands', 'North Macedonia', 'Mali', 'Myanmar', 'Mongolia', 'Macau', 'Northern Mariana Islands',
    'Martinique', 'Mauritania', 'Montserrat', 'Malta', 'Mauritius', 'Maldives', 'Malawi', 'Mexico',
    'Malaysia', 'Mozambique', 'Namibia', 'New Caledonia', 'Niger', 'Norfolk Island', 'Nigeria', 'Nicaragua',
    'Netherlands', 'Norway', 'Nepal', 'Nauru', 'Niue', 'New Zealand', 'Oman', 'Panama', 'Peru',
    'French Polynesia', 'Papua New Guinea', 'Philippines', 'Pakistan', 'Poland', 'Saint Pierre and Miquelon',
    'Pitcairn', 'Puerto Rico', 'Portugal', 'Palau', 'Paraguay', 'Qatar', 'Réunion', 'Romania', 'Serbia',
    'Russia', 'Rwanda', 'Saudi Arabia', 'Solomon Islands', 'Seychelles', 'Sudan', 'Sweden', 'Singapore',
    'Saint Helena', 'Slovenia', 'Svalbard and Jan Mayen', 'Slovakia', 'Sierra Leone', 'San Marino',
    'Senegal', 'Somalia', 'Suriname', 'South Sudan', 'São Tomé and Príncipe', 'El Salvador', 'Sint Maarten',
    'Syria', 'Switzerland', 'Turks and Caicos Islands', 'Chad', 'French Southern Territories', 'Togo',
    'Thailand', 'Tajikistan', 'Tokelau', 'Timor-Leste', 'Turkmenistan', 'Tunisia', 'Tonga', 'Turkey',
    'Trinidad and Tobago', 'Tuvalu', 'Tanzania', 'Ukraine', 'Uganda', 'United States', 'Uruguay',
    'Uzbekistan', 'Vatican City', 'Saint Vincent and the Grenadines', 'Venezuela', 'British Virgin Islands',
    'United States Virgin Islands', 'Vietnam', 'Vanuatu', 'Wallis and Futuna', 'Samoa', 'Kosovo', 'Yemen',
    'Mayotte', 'South Africa', 'Zambia', 'Zimbabwe'
];

const validListings = ["Rooms","Mountains","Beaches"];

const LSchema = new mongoose.Schema(
    {
        title:
        {
            type:String,
        },
        description:
        {
            type:String,
    
        },
        image:
        {
           url:String,
           filename : String,
        },
        price:
        {
            type:Number,
            min: [0, 'Price must be a positive number or zero'],
        },
        location:
        {
            type:String,
        },
        country:
        {
            type:String,
            enum: validCountry,
         
        },
        reviews:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review',
            },
        ],
        owner: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        category:
        {
            type: "string",
            required: true,
            enum: validListings,
        },
    }
)

LSchema.post("findOneAndDelete",async (data) =>
{
    if(data.reviews.length)
    {
        await Review.deleteMany({_id : {$in : data.reviews}});
    }

});

const Listing = mongoose.model("Listing",LSchema);

module.exports = Listing;

