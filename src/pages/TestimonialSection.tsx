import React, { useEffect, useState } from "react";
import axios from "axios";

const staticTestimonials = [
  { message: "Iyi sisitemu yatumye mbona indangamuntu yanjye nari nataye mu gihe gito cyane.", name: "Jean Paul" },
  { message: "Ndashimira uburyo serivisi zabo ziri hafi y’abaturage, cyane cyane mu cyaro.", name: "Marie Claire" },
  { message: "Gukoresha AI mu gushaka ibyangombwa byatakaye ni igitekerezo cyiza cyane.", name: "Eric" },
  { message: "Sisitemu yabo yihuta kandi yizewe, byamfashije cyane.", name: "Aline" },
  { message: "Kubona pasiporo yanjye byahise bitinda gato kubera iyi porogaramu.", name: "Samuel" },
  { message: "Nshimira cyane ubufasha bwanjye bwose buva kuri Find with AI Rwanda.", name: "Chantal" },
  { message: "Nari nabuze permis yanjye, barayibonye vuba kandi mu buryo bwizewe.", name: "Fabrice" },
  { message: "Ikoranabuhanga rikoreshwa na Find with AI riradufasha cyane mu buzima bwacu.", name: "Emmy" },
  { message: "Ndagira inama buri wese gukoresha iyi sisitemu, ni ingenzi kandi ifite ireme.", name: "Jeanette" }
];

const TestimonialSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get("/api/feedbacks")
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error("Failed to fetch feedbacks", err));
  }, []);

  const allTestimonials = [...staticTestimonials, ...feedbacks];

  return (
    <section id="testimonials">
      <br />
      <br />
      <br />
      <h2>Abatubwira</h2>
      <div className="testimonials">
        {allTestimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <p>"{t.message}"</p>
            <h4>{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
