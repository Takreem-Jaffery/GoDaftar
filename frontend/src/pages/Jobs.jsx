import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const cities = useMemo(
    () => [
      "All", "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan",
      "Hyderabad", "Quetta", "Peshawar", "Sialkot", "Gujranwala", "Sargodha",
      "Bahawalpur", "Sukkur", "Mardan", "Mingora", "Sheikhupura", "Mandi Bahauddin",
      "Larkana", "Nawabshah",
    ],
    []
  );

  const nichesArray = useMemo(
    () => [
      "All", "Software Development", "Web Development", "Cybersecurity", "Data Science",
      "Artificial Intelligence", "Cloud Computing", "DevOps", "Mobile App Development",
      "Blockchain", "Database Administration", "Network Administration", "UI/UX Design",
      "Game Development", "IoT (Internet of Things)", "Big Data", "Machine Learning",
      "IT Project Management", "IT Support and Helpdesk", "Systems Administration",
      "IT Consulting",
    ],
    []
  );

  const handleCityChange = useCallback((city) => {
    setCity(city);
    setSelectedCity(city);
  }, []);

  const handleNicheChange = useCallback((niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  }, []);

  const handleSearch = useCallback(() => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, city, niche, searchKeyword]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [city, niche, searchKeyword, dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Find Job</button>
            <FaSearch />
          </div>
          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job By City</h2>
                {cities.map((c, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={c}
                      name="city"
                      value={c}
                      checked={selectedCity === c}
                      onChange={() => handleCityChange(c)}
                    />
                    <label htmlFor={c}>{c}</label>
                  </div>
                ))}
              </div>
              <div className="cities">
                <h2>Filter Job By Niche</h2>
                {nichesArray.map((n, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={n}
                      name="niche"
                      value={n}
                      checked={selectedNiche === n}
                      onChange={() => handleNicheChange(n)}
                    />
                    <label htmlFor={n}>{n}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="mobile-filter">
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Filter By City</option>
                  {cities.map((c, index) => (
                    <option value={c} key={index}>
                      {c}
                    </option>
                  ))}
                </select>
                <select value={niche} onChange={(e) => setNiche(e.target.value)}>
                  <option value="">Filter By Niche</option>
                  {nichesArray.map((n, index) => (
                    <option value={n} key={index}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="jobs_container">
                {jobs && jobs.length > 0 ? (
                  jobs.map((element) => (
                    <div className="card" key={element._id}>
                      <p className={element.hiringMultipleCandidates === "Yes" ? "hiring-multiple" : "hiring"}>
                        {element.hiringMultipleCandidates === "Yes" ? "Hiring Multiple Candidates" : "Hiring"}
                      </p>
                      <p className="title">{element.title}</p>
                      <p className="company">{element.companyName}</p>
                      <p className="location">{element.location}</p>
                      <p className="salary">
                        <span>Salary:</span> Rs. {element.salary}
                      </p>
                      <p className="posted">
                        <span>Posted On:</span> {element.jobPostedOn.substring(0, 10)}
                      </p>
                      <div className="btn-wrapper">
                        <Link className="btn" to={`/post/application/${element._id}`}>
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Job not found<img src="src/notfound.png" alt="job-not-found" /></p>                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
// import Spinner from "../components/Spinner";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Jobs = () => {
//   const [city, setCity] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [niche, setNiche] = useState("");
//   const [selectedNiche, setSelectedNiche] = useState("");
//   const [searchKeyword, setSearchKeyword] = useState("");

//   const { jobs, loading, error } = useSelector((state) => state.jobs);

//   const handleCityChange = (city) => {
//     setCity(city);
//     setSelectedCity(city);
//   };
//   const handleNicheChange = (niche) => {
//     setNiche(niche);
//     setSelectedNiche(niche);
//   };

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllJobErrors());
//     }
//     dispatch(fetchJobs(city, niche, searchKeyword));
//   }, [dispatch, error, city, niche, searchKeyword]);

//   const handleSearch = () => {
//     dispatch(fetchJobs(city, niche, searchKeyword));
//   };

//   const cities = [
//     "All",
//     "Karachi",
//     "Lahore",
//     "Islamabad",
//     "Rawalpindi",
//     "Faisalabad",
//     "Multan",
//     "Hyderabad",
//     "Quetta",
//     "Peshawar",
//     "Sialkot",
//     "Gujranwala",
//     "Sargodha",
//     "Bahawalpur",
//     "Sukkur",
//     "Mardan",
//     "Mingora",
//     "Sheikhupura",
//     "Mandi Bahauddin",
//     "Larkana",
//     "Nawabshah",
//   ];

//   const nichesArray = [
//     "All",
//     "Software Development",
//     "Web Development",
//     "Cybersecurity",
//     "Data Science",
//     "Artificial Intelligence",
//     "Cloud Computing",
//     "DevOps",
//     "Mobile App Development",
//     "Blockchain",
//     "Database Administration",
//     "Network Administration",
//     "UI/UX Design",
//     "Game Development",
//     "IoT (Internet of Things)",
//     "Big Data",
//     "Machine Learning",
//     "IT Project Management",
//     "IT Support and Helpdesk",
//     "Systems Administration",
//     "IT Consulting",
//   ];

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <section className="jobs">
//           <div className="search-tab-wrapper">
//             <input
//               type="text"
//               value={searchKeyword}
//               onChange={(e) => setSearchKeyword(e.target.value)}
//             />
//             <button onClick={handleSearch}>Find Job</button>
//             <FaSearch />
//           </div>
//           <div className="wrapper">
//             <div className="filter-bar">
//               <div className="cities">
//                 <h2>Filter Job By City</h2>
//                 {cities.map((city, index) => (
//                   <>
//                   <div key={index}>
//                     <input
//                       type="radio"
//                       id={city}
//                       name="city"
//                       value={city}
//                       checked={selectedCity === city}
//                       onChange={() => handleCityChange(city)}
//                       />
//                     <label htmlFor={city}>{city}</label>
//                   </div>
//                       </>
//                 ))}
//               </div>
//               <div className="cities">
//                 <h2>Filter Job By Niche</h2>
//                 {nichesArray.map((niche, index) => (
//                   <div key={index}>
//                     <input
//                       type="radio"
//                       id={niche}
//                       name="niche"
//                       value={niche}
//                       checked={selectedNiche === niche}
//                       onChange={() => handleNicheChange(niche)}
//                     />
//                     <label htmlFor={niche}>{niche}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="container">
//               <div className="mobile-filter">
//                 <select value={city} onChange={(e) => setCity(e.target.value)}>
//                   <option value="">Filter By City</option>
//                   {cities.map((city, index) => (
//                     <option value={city} key={index}>
//                       {city}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   value={niche}
//                   onChange={(e) => setNiche(e.target.value)}
//                 >
//                   <option value="">Filter By Niche</option>
//                   {nichesArray.map((niche, index) => (
//                     <option value={niche} key={index}>
//                       {niche}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="jobs_container">
//                 {jobs && jobs.length > 0 ? (jobs.map((element) => {
//                     return (
//                       <div className="card" key={element._id}>
//                         {element.hiringMultipleCandidates === "Yes" ? (
//                           <p className="hiring-multiple">
//                             Hiring Multiple Candidates
//                           </p>
//                         ) : (
//                           <p className="hiring">Hiring</p>
//                         )}
//                         <p className="title">{element.title}</p>
//                         <p className="company">{element.companyName}</p>
//                         <p className="location">{element.location}</p>
//                         <p className="salary">
//                           <span>Salary:</span> Rs. {element.salary}
//                         </p>
//                         <p className="posted">
//                           <span>Posted On:</span>{" "}
//                           {element.jobPostedOn.substring(0, 10)}
//                         </p>
//                         <div className="btn-wrapper">
//                           <Link
//                             className="btn"
//                             to={`/post/application/${element._id}`}
//                           >
//                             Apply Now
//                           </Link>
//                         </div>
//                       </div>
//                     );
//                   })) : (
//                   /************************************************************/
//                   /* BUG No.2 */
//                   <img src="./notfound.png" alt="job-not-found" style={{width: "100%"}}/>)
//                   /************************************************************/




//                   }
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default Jobs;