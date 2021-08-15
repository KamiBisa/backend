#!/bin/sh

# heroku env vars
export JWT_SECRET=fdlkf9023052309ifofjKDFFJKl___f0-d---fKFDIE932RDOkfdlf0-20Ikdfkfk$$koepiiKI91839
export JWT_EXPIRES=7d

export CLOUDINARY_CLOUD_NAME=dlofpv0uy
export CLOUDINARY_API_KEY=487358118359725
export CLOUDINARY_API_SECRET=dI_pjiLf_t3QbATkaogELMU-EhA

# init db and start
npm run db-init && npm run start