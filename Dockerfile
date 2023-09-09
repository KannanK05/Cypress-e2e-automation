FROM cypress/included:3.2.0

WORKDIR  /e2e-automation
COPY ./package.json .
COPY ./cypress ./cypress
RUN npm i

ENTRYPOINT ["npx","run","cypress"]
CMD ["npm","run","cypress:run"]