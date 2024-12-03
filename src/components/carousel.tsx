import React from 'react';
import QuestionCard from "./card";
import Slider from 'react-slick';
import { Question } from "./card";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Data {
  questions: Question[];
}

const Carousel: React.FC<Data> = ({questions}) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1, // Number of cards to show at once
    slidesToScroll: 1, // Number of cards to scroll
    responsive: [
      {
        breakpoint: 768, // For tablets
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480, // For mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {questions.map((question) => (
        <QuestionCard question={question.question}
                      response={question.response}
                      model_accuracy={question.model_accuracy} />
      ))}
    </Slider>
  );
};

export default Carousel;