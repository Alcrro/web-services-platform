export const companyDetails: ICompany = {
  name: "ALCRRO SRL",
  address: {
    country: "-",
    streetName: "-",
    streetNo: "-",
  },
  email: "alex.roventa94@gmail.com",
  phone: "N/A",
  logo: "",
  CUI: "N/A",
};

export interface ICompany {
  name: string;
  address: ICompanyAddress;
  email: string;
  phone: string;
  logo: string;
  CUI: string;
}

export interface ICompanyAddress {
  country: string;
  streetName: string;
  streetNo: string;
}
