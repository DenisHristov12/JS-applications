// export function initialize(routes) {
//     const nav = document.querySelector("nav");
//     nav.addEventListener("click", onNavigate);

//     const context = {
//         goTo,
//         showSection,
//         updateNav,

//     };

//     function showSection(section) {
//         document.getElementById("root").replaceChildren(section);
//     }

//     function onNavigate(e) {
//         const target = e.target;

//         if (target.tagName === "A") {
//             e.preventDefault();

//             const url = new URL(target.href);

//             goTo(url.pathname);
//         }
//     }

//     function goTo(pathName, ...params) {
//         const handler = routes[pathName];

//         if (typeof handler === "function") {
//             handler(context, ...params);
//         }
//     }

//     function updateNav() {
//         const user = sessionStorage.getItem("user");

//         if(user){
//             nav.querySelectorAll(".user").forEach((e) => {
//                 e.computedStyleMap.display = "block";
//             });
//             nav.querySelectorAll(".guest").forEach((e) => {
//                 e.computedStyleMap.display = "none";
//             });
//         }else{
//             nav.querySelectorAll(".user").forEach((e) => {
//                 e.computedStyleMap.display = "none";
//             });
//             nav.querySelectorAll(".user").forEach((e) => {
//                 e.computedStyleMap.display = "block";
//             });
//         }
//     }

//     return context;
// }