export interface LocationData {
    division: string;
    divisionBn: string;
    districts: {
        name: string;
        nameBn: string;
        areas: { name: string; nameBn: string }[];
    }[];
}

export const bdLocations: LocationData[] = [
    {
        division: 'Dhaka',
        divisionBn: 'ঢাকা',
        districts: [
            {
                name: 'Dhaka',
                nameBn: 'ঢাকা',
                areas: [
                    { name: 'Dhanmondi', nameBn: 'ধানমন্ডি' },
                    { name: 'Mirpur', nameBn: 'মিরপুর' },
                    { name: 'Gulshan', nameBn: 'গুলশান' },
                    { name: 'Uttara', nameBn: 'উত্তরা' },
                    { name: 'Mohammadpur', nameBn: 'মোহাম্মদপুর' },
                    { name: 'Savar', nameBn: 'সাভার' },
                    { name: 'Dhamrai', nameBn: 'ধামরাই' },
                    { name: 'Keraniganj', nameBn: 'কেরানীগঞ্জ' },
                    { name: 'Badda', nameBn: 'বাড্ডা' },
                    { name: 'Jatrabari', nameBn: 'যাত্রাবাড়ী' },
                    { name: 'Shahbagh', nameBn: 'শাহবাগ' },
                ],
            },
            {
                name: 'Gazipur',
                nameBn: 'গাজীপুর',
                areas: [
                    { name: 'Sadar', nameBn: 'গাজীপুর সদর' },
                    { name: 'Sreepur', nameBn: 'শ্রীপুর' },
                    { name: 'Kaliakair', nameBn: 'কালিয়াকৈর' },
                    { name: 'Kapasia', nameBn: 'কপাসিয়া' },
                    { name: 'Tongi', nameBn: 'টঙ্গী' },
                ],
            },
            {
                name: 'Narayanganj',
                nameBn: 'নারায়ণগঞ্জ',
                areas: [
                    { name: 'Sadar', nameBn: 'নারায়ণগঞ্জ সদর' },
                    { name: 'Araihazar', nameBn: 'আড়াইহাজার' },
                    { name: 'Bandar', nameBn: 'বন্দর' },
                    { name: 'Rupganj', nameBn: 'রূপগঞ্জ' },
                    { name: 'Sonargaon', nameBn: 'সোনারগাঁও' },
                ],
            },
        ],
    },
    {
        division: 'Khulna',
        divisionBn: 'খুলনা',
        districts: [
            {
                name: 'Khulna',
                nameBn: 'খুলনা',
                areas: [
                    { name: 'Sonadanga', nameBn: 'সোনাডাঙ্গা' },
                    { name: 'Khalishpur', nameBn: 'খালিশপুর' },
                    { name: 'Boyra', nameBn: 'বয়রা' },
                    { name: 'Daulatpur', nameBn: 'দৌলতপুর' },
                    { name: 'Rupsha', nameBn: 'রূপসা' },
                    { name: 'Phultala', nameBn: 'ফুলতলা' },
                    { name: 'Khan Jahan Ali', nameBn: 'খান জাহান আলী' },
                    { name: 'Batiaghata', nameBn: 'বটিয়াঘাটা' },
                    { name: 'Dacope', nameBn: 'দাকোপ' },
                    { name: 'Dumuria', nameBn: 'ডুমুরিয়া' },
                    { name: 'Paikgachha', nameBn: 'পাইকগাছা' },
                ],
            },
            {
                name: 'Jashore',
                nameBn: 'যশোর',
                areas: [
                    { name: 'Sadar', nameBn: 'যশোর সদর' },
                    { name: 'Abhaynagar', nameBn: 'অভয়নগর' },
                    { name: 'Bagherpara', nameBn: 'বাঘারপাড়া' },
                    { name: 'Chaugachha', nameBn: 'চৌগাছা' },
                    { name: 'Jhikargachha', nameBn: 'ঝিকরগাছা' },
                    { name: 'Keshabpur', nameBn: 'কেশপুর' },
                    { name: 'Manirampur', nameBn: 'মণিরামপুর' },
                    { name: 'Sharsha', nameBn: 'শার্শা' },
                ],
            },
            {
                name: 'Satkhira',
                nameBn: 'সাতক্ষীরা',
                areas: [
                    { name: 'Sadar', nameBn: 'সাতক্ষীরা সদর' },
                    { name: 'Assasuni', nameBn: 'আশাশুনি' },
                    { name: 'Debhata', nameBn: 'দেবহাটা' },
                    { name: 'Kalaroa', nameBn: 'কলারোয়া' },
                    { name: 'Kaliganj', nameBn: 'কালীগঞ্জ' },
                    { name: 'Shyamnagar', nameBn: 'শ্যামনগর' },
                    { name: 'Tala', nameBn: 'তালা' },
                ],
            },
        ],
    },
    {
        division: 'Chittagong',
        divisionBn: 'চট্টগ্রাম',
        districts: [
            {
                name: 'Chittagong',
                nameBn: 'চট্টগ্রাম',
                areas: [
                    { name: 'Pahartali', nameBn: 'পাহাড়তলী' },
                    { name: 'Panchlaish', nameBn: 'পাঁচলাইশ' },
                    { name: 'Halishahar', nameBn: 'হালিশহর' },
                    { name: 'Kotwali', nameBn: 'কোতোয়ালী' },
                    { name: 'Patenga', nameBn: 'পতেঙ্গা' },
                    { name: 'Anwara', nameBn: 'আনোয়ারা' },
                    { name: 'Hathazari', nameBn: 'হাটহাজারী' },
                    { name: 'Sitakunda', nameBn: 'সীতাকুণ্ড' },
                ],
            },
            {
                name: 'Cox\'s Bazar',
                nameBn: 'কক্সবাজার',
                areas: [
                    { name: 'Sadar', nameBn: 'কক্সবাজার সদর' },
                    { name: 'Chakaria', nameBn: 'চকোরিয়া' },
                    { name: 'Teknaf', nameBn: 'টেকনাফ' },
                    { name: 'Ukhia', nameBn: 'উখিয়া' },
                    { name: 'Moheshkhali', nameBn: 'মহেশখালী' },
                ],
            },
        ],
    },
    {
        division: 'Rajshahi',
        divisionBn: 'রাজশাহী',
        districts: [
            {
                name: 'Rajshahi',
                nameBn: 'রাজশাহী',
                areas: [
                    { name: 'Boalia', nameBn: 'বোয়ালিয়া' },
                    { name: 'Motihar', nameBn: 'মতিহার' },
                    { name: 'Rajpara', nameBn: 'রাজপাড়া' },
                    { name: 'Shah Makhdum', nameBn: 'শাহ মখদুম' },
                    { name: 'Paba', nameBn: 'পবা' },
                    { name: 'Godagari', nameBn: 'গোদাঘাড়ী' },
                ],
            },
            {
                name: 'Bogra',
                nameBn: 'বগুড়া',
                areas: [
                    { name: 'Sadar', nameBn: 'বগুড়া সদর' },
                    { name: 'Shajahanpur', nameBn: 'জাহাজানপুর' },
                    { name: 'Sherpur', nameBn: 'শেরপুর' },
                    { name: 'Shibganj', nameBn: 'শিবগঞ্জ' },
                ],
            },
        ],
    },
    {
        division: 'Sylhet',
        divisionBn: 'সিলেট',
        districts: [
            {
                name: 'Sylhet',
                nameBn: 'সিলেট',
                areas: [
                    { name: 'Sadar', nameBn: 'সিলেট সদর' },
                    { name: 'Beanibazar', nameBn: 'বিয়ানীবাজার' },
                    { name: 'Golapganj', nameBn: 'গোলাপগঞ্জ' },
                    { name: 'Jaflong', nameBn: 'জাফলং' },
                ],
            },
        ],
    },
    {
        division: 'Barisal',
        divisionBn: 'বরিশাল',
        districts: [
            {
                name: 'Barisal',
                nameBn: 'বরিশাল',
                areas: [
                    { name: 'Sadar', nameBn: 'বরিশাল সদর' },
                    { name: 'Bakerganj', nameBn: 'বাকেরগঞ্জ' },
                    { name: 'Babuganj', nameBn: 'বাবুগঞ্জ' },
                ],
            },
        ],
    },
    {
        division: 'Rangpur',
        divisionBn: 'রংপুর',
        districts: [
            {
                name: 'Rangpur',
                nameBn: 'রংপুর',
                areas: [
                    { name: 'Sadar', nameBn: 'রংপুর সদর' },
                    { name: 'Mithapukur', nameBn: 'মিঠাপুকুর' },
                    { name: 'Pirganj', nameBn: 'পীরগঞ্জ' },
                ],
            },
        ],
    },
    {
        division: 'Mymensingh',
        divisionBn: 'ময়মনসিংহ',
        districts: [
            {
                name: 'Mymensingh',
                nameBn: 'ময়মনসিংহ',
                areas: [
                    { name: 'Sadar', nameBn: 'ময়মনসিংহ সদর' },
                    { name: 'Muktagachha', nameBn: 'মুক্তাগাছা' },
                    { name: 'Trishal', nameBn: 'ত্রিশাল' },
                ],
            },
        ],
    },
];