import csv
import os
import subprocess
from jinja2 import Environment, FileSystemLoader

#from datetime import date


VARIANTS_DIR = "variants"
QR_DIR = "qrcodes"

os.makedirs(VARIANTS_DIR, exist_ok=True)
os.makedirs(QR_DIR, exist_ok=True)


def generate(title, date, questions, form_id):
    print("––––– ПРИНЯТО –––––––")

    tasks_by_variant = {}
    rows = []

    for question in questions:
        rows.append({
            "variant": "1",
            "question": question.text,
            "points": question.max_score
        })

    make_pdf(form_id, title, date, tasks_by_variant, rows)


def make_pdf(form_id, title, date, tasks_by_variant, rows):
    for row in rows:
        v = int(row["variant"])
        tasks_by_variant.setdefault(v, []).append({
            "question": row["question"],
            "points": row["points"]
        })


    env = Environment(loader=FileSystemLoader("."), block_start_string='{%', block_end_string='%}', variable_start_string='{{', variable_end_string='}}')
    template = env.get_template("template.tex")

    for variant, tasks in tasks_by_variant.items():
        rendered = template.render(
            variant=variant,
            tasks=list(enumerate(tasks, 1)),
            date=date,
            title=title
        )

        tex_filename = f"{VARIANTS_DIR}/form_{form_id}.tex"
        with open(tex_filename, "w", encoding="utf-8") as f:
            f.write(rendered)

        subprocess.run(["pdflatex", "-interaction=nonstopmode", "-output-directory", VARIANTS_DIR, tex_filename], check=True)



