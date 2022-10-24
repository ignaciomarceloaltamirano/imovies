export const btnStyle =
  'bg-secondary-color hover:bg-primary-color block transition-all ease-in duration-300 sm:px-4 px-2 py-2 sm:text-base text-sm rounded mt-4';

export const episodeRuntime = (item) => {
  if (item?.episode_run_time.length === 1) {
    const runtime =
      `${Math.floor(item?.episode_run_time / 60)}` < 1
        ? `${Math.floor(item?.episode_run_time & 60)} min`
        : `${Math.floor(item?.episode_run_time / 60)}h :${
            item?.episode_run_time % 60
          } min`;
    return runtime;
  } else if (item?.episode_run_time.length === 0) {
    return;
  } else {
    const runtime =
      `${Math.floor(item?.episode_run_time[0] / 60)}` < 1
        ? `${Math.floor(item?.episode_run_time[0] & 60)} min`
        : `${Math.floor(item?.episode_run_time[0] / 60)}h :${
            item?.episode_run_time[0] % 60
          } min`;
    return runtime;
  }
};

export const movieRuntime = (item) => {
  const runtime =
    `${Math.floor(item?.runtime / 60)}` < 1
      ? `${Math.floor(item?.runtime & 60)} min`
      : `${Math.floor(item?.runtime / 60)} h : ${item?.runtime % 60} min`;
  return runtime;
};
