import {
  FaBook,
  FaCar,
  FaComputer,
  FaDog,
  FaMountainSun,
  FaMusic,
  FaPeopleRoof,
} from 'react-icons/fa6'
import { QuestionCategory } from '../types'

import { TiGlobe } from 'react-icons/ti'
import {
  GiFilmProjector,
  GiScrollUnfurled,
  GiSoapExperiment,
} from 'react-icons/gi'
import { TbMath } from 'react-icons/tb'
import { FaPaintBrush, FaTableTennis } from 'react-icons/fa'

export const QuizCategories: QuestionCategory[] = [
  {
    id: 9,
    name: 'GK',
    icon: TiGlobe,
  },
  {
    id: 10,
    name: 'Books',
    icon: FaBook,
  },
  {
    id: 11,
    name: 'Film',
    icon: GiFilmProjector,
  },
  {
    id: 12,
    name: 'Music',
    icon: FaMusic,
  },
  {
    id: 17,
    name: 'Science',
    icon: GiSoapExperiment,
  },
  {
    id: 18,
    name: 'CS',
    icon: FaComputer,
  },
  {
    id: 19,
    name: 'Math',
    icon: TbMath,
  },
  {
    id: 21,
    name: 'Sports',
    icon: FaTableTennis,
  },
  {
    id: 22,
    name: 'Geo',
    icon: FaMountainSun,
  },
  {
    id: 23,
    name: 'History',
    icon: GiScrollUnfurled,
  },
  {
    id: 24,
    name: 'Politics',
    icon: FaPeopleRoof,
  },
  {
    id: 25,
    name: 'Art',
    icon: FaPaintBrush,
  },
  {
    id: 27,
    name: 'Animals',
    icon: FaDog,
  },
  {
    id: 28,
    name: 'Vehicles',
    icon: FaCar,
  },
]
