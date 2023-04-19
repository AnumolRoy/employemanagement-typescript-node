import * as React from "react";
import Card from "../components/Card/Card";
import Main from "../components/Main/Main";
// import Document from "../components/Documents/Document"
import { useState, useEffect } from "react";
// import "./homepage.css"

function HomePage(): JSX.Element {
  // const [employees, setEmployees] = useState<User[]>([]);
  // console.log("//////////////////////////////////////////////////////////////");
  // useEffect(() => {
  //   (async () => {
  //     // console.log("first")
  //     // const items: any = await sp.web.lists.getByTitle('Contactslist').items();
  //     // const newEmployees = items.map((item: any) => ({
  //     //   Id: item.Id ,
  //     //   Name: item.Name,
  //     //   email: item.email,
  //     //   gender: item.gender,
  //     //   designation: item.designation,
  //     //   url : item.url,
  //     // }));
  //     // setEmployees(newEmployees);
  //     // console.log(`employees+++++++++++++++++++++++ ${employees}`)
  //   })();
  // }, []);

  return (
    <div>
      <div className="mainNav">
        <Main />
      </div>
      <div className="cardcomponent">
        {" "}
        <Card users={[]} />
      </div>
    </div>
  );
}

export default HomePage;
