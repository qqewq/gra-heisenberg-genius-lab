FROM nvcr.io/nvidia/pytorch:23.10-py3

COPY requirements.txt /app/
WORKDIR /app
RUN pip install -r requirements.txt

COPY . /app/

ENV PYTHONUNBUFFERED=1
ENV NVIDIA_VISIBLE_DEVICES=all
ENV NVIDIA_DRIVER_CAPABILITIES=all

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
