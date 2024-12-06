import React, { useState } from 'react';
import QuestionCard from "./card";
import Slider from 'react-slick';
import { Question } from "./card";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


interface Data {
  questions: Question[];
}

const Carousel: React.FC<Data> = ({questions}) => {
  // const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // const openModal = () => setShowEditModal(true);
  // const closeModal = () => setShowEditModal(false);

  const [data, setData] = useState(questions);

  const onSave = (question_object: Question) => {
    setData(data.map((q) => 
      q.question_id === question_object.question_id ? question_object : q
    ));
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
      {data.map((question) => (
        <QuestionCard question_object={question} on_save={onSave} />
      ))}
    </Slider>
    </>
    
  );
};

export default Carousel;