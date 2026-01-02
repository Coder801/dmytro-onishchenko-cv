import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { makeProfileSelector, getAllSkills, getProfileData } from "@/context/AppContext/selectors";

// Пример 1: Использование универсального селектора
export const ProfileExample = () => {
  const profile = useSelector(makeProfileSelector);

  return (
    <div>
      <h1>Текущий язык: {profile.language}</h1>
      <h2>Скиллы:</h2>
      <ul>
        {profile.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      {profile.isLoading && <p>Загрузка...</p>}
      {profile.error && <p>Ошибка!</p>}
    </div>
  );
};

// Пример 2: Использование селектора только для скиллов
export const SkillsExample = () => {
  const skills = useSelector(getAllSkills);

  return (
    <div>
      <h2>Только скиллы:</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

// Пример 3: Использование селектора для данных профиля
export const ProfileDataExample = () => {
  const profileData = useSelector(getProfileData);

  return (
    <div>
      {profileData && (
        <>
          <h1>{profileData.profile.name.first} {profileData.profile.name.last}</h1>
          <p>{profileData.profile.position}</p>
        </>
      )}
    </div>
  );
};
