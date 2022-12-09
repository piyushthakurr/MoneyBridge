export default function() {
  return [
    {
      title: "Dashboard",
      to: "/auth/dashboard",
      htmlBefore: '<i class="material-icons"></i>',
    },
    {
      title: "Users",
      to: "/auth/traders",
      htmlBefore: '<i class="material-icons"> </i>',
    },
    {
      title: "Banking",
      to: "/auth/banking",
      htmlBefore: '<i class="material-icons"> </i>',
    }/* ,
    {
      title: "Sub Admin",
      to: "/auth/subAdmin",
      htmlBefore: '<i class="material-icons"> </i>',
    } */
    
    /* ,
    {
      title: "Payment History",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/payment-history",
    } */
  ];
}
