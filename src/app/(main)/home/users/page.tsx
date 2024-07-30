import UsersList from "@/app/shared/admin/users/usersList";
import PageHeader from "@/app/shared/page-header";

const pageHeader = {
  title: "Users",
  breadcrumb: [
    {
      name: "Users",
    },
    {
      name: "List",
    },
  ],
};

const Users = () => {
  return (<>
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
    <UsersList />
  
  </>
  );
};

export default Users;
